/*jslint browser: true, indent: 2, sloppy: true, white: true, vars: true */
/*globals jQuery, _ */


(function ($, u) {
  // Hide all of the conditional questions, recursively.
  function hideSubQ(parent) {
    var form = $('#qaform');
    $('.control-group[data-parent=' + parent + ']').each(function (i) {
      var $el = $(this);
      $el.hide();

      // Uncheck the answers
      $('input[type=radio]', $el).each(function () {
        $(this).attr('checked', false);
      });

      // Handle conditional questions.
      hideSubQ($el.attr('id'));
    });
  }

  function addQuestion(question, visible, parentID, triggerID) {
    if (visible === undefined) {
      visible = true;
    }
    if (parentID === undefined) {
      parentID = '';
    }
    if (triggerID === undefined) {
      triggerID = '';
    }

    var form = $('#qaform');
    var id = u.uniqueId();
    var data = {
      text: question.text,
      id: id,
      parentID: parentID,
      triggerID: triggerID
    };

    var $question = $(u.template($('#question').html(), data));
    if (!visible) {
      $question.hide();
    }
    form.append($question);

    // Add each response.
    u.each(question.answers, function (answer) {
      var triggerID = u.uniqueId();
      var data = {
        questionName: question.name,
        id: triggerID,
        value: answer.value,
        text: answer.text
      };
      var $answer = $(u.template($('#answer').html(), data));
      $question.append($answer);

      // Add the click handler
      $answer.click(function handleClick(e) {
        // Hide all of the conditional questions, recursively.
        hideSubQ(id);

        // Show the conditional questions for this response.
        $('.control-group[data-trigger=' + triggerID + ']').each(function (i) {
          $(this).show();
        });
      });

      // If there are conditional questions, add them.
      // They are hidden by default.
      if (answer.questions !== undefined) {
        u.each(answer.questions, function (subq) {
          addQuestion(subq, false, id, triggerID);
        });
      }
    });
  }

  $(document).ready(function () {
    $.ajax({url: 'data.json'})
    .done(function (data) {
      u.each(data.questions, function (question) {
        addQuestion(question);
      });
    });
  });
}(jQuery, _));
