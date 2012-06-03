Exploration in Conditional Survey Questions
-------------------------------------------

The survey question & answer structure is embedded in a JSON data structure.

The data structure consists of main two objects: a Question and an Answer.

### Question
A Question has 3 properties:

+ `name` : (string) the ID to be used when recording the response. Example: `"building-condition"`
+ `text`: (string) the text to render for this question. Example: `"What is the building condition?"`
+ `answers`: an array of Answer objects

### Answer
An Answer has 2 required properties and 1 optional property:

+ `name`: (string) the value to use when recording the response. Example: `"2"`
+ `text`: (string) the text to render for this answer. Example: `"Fair"`
+ `questions`: (optional) an array of Question objects. These will only be used/displayed if the parent answer has been selected. If that answer is deselected, these questions should be hidden and their data should not be recorded.

### Root object
The root object has one property, `questions`, which is a list of Question objects. These questions are always used; they are not conditioned on any other particular answers.

## Example

```
{
  "questions": [
      { "name" : "use",
        "text" : "What's the use?",
        "answers" : [
            { "value" : "retail",
              "text" : "Retail",
              "questions" : [
                { "name" : "retail-type",
                  "text" : "What type of retail?",
                  "answers" : [
                    { "value" : "best",
                      "text" : "the best type of retail",
                      "questions" : [
                        { "value" : "good-level",
                          "text" : "How good?",
                          "answers" : [
                            { "value" : "3",
                              "text" : "excellent"
                            },
                            { "value" : "2",
                              "text" : "quite good"
                            },
                            { "value" : "1",
                              "text" : "pretty good"
                            }
                          ]
                        }
                      ]
                    },
                    { "value" : "worst",
                      "text" : "the worst type of retail"
                    }
                  ]
                },
                { "name" : "vod",
                  "text" : "Vacant+Open+Dangerous?",
                  "answers" : [
                    { "value" : "1",
                      "text" : "yes"
                    },
                    {
                      "value" : "0",
                      "text" : "no"
                    }
                  ]
                }
              ]
            },
            { "value" : "service",
              "text" : "Service",
              "questions" : [
                { "name" : "service-type",
                  "text" : "What type of service?",
                  "answers" : [
                    { "value" : "dry-cleaner",
                      "text" : "A Dry Cleaner, yo!"
                    },
                    { "value" : "other",
                      "text" : "Other Service"
                    }
                  ]
                }
              ]
            },
            { "value" : "storage",
              "text" : "Storage"
            }
        ]
      }
  ]
}
```

