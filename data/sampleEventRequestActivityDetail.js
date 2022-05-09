exports.sampleEventHistoricalRidesStrava = {
  "Records": [
      {
          "messageId": "2f65d76a-e741-4c41-942c-8def237564b5",
          "receiptHandle": "AQEBGf5E2rvM1WeAzPvAXw6OZ569Tunf4mgmxeQQzqPm/3t3YsxEy3sHHaV0FkAxYSxsWtmVcTjhtDF7W4c2FMIiHc84F5tKeL/pX9QcmU6oyLtRUBHQmliq1jyzfrEkBk7WO/0zZsikem9MuevSgFsJ6HQqj6KGXXZIDB/dMdsh+anLoBUV6H33gI20taRtrXlTBoW7ptHCPx4+hiHUdo1d/n0jm4k6bniT8/yyeGanIAv1TWjLj5Zr4dWFQ2NByoW4H+GC8yNbcE7thAi8spiIbwyzlEc0+sDGtrFkOeQZ+vlsZmAEB7sBD0sBGcCdO3Ei6dQCw9bhtP8u51MVmeRd9RSAKiO1sxjm/IS7+d7VbLhcfAwp4NNK4hVQ4DvsA1oAEmooTmtmG1FzRClIltcAq/aZnDxAgsf+zkiahmo3Np0=",
          "body": "Test request for activity detail",
          "attributes": {
              "ApproximateReceiveCount": "3",
              "SentTimestamp": "1652027070662",
              "SenderId": "085991549361",
              "ApproximateFirstReceiveTimestamp": "1652027074303"
          },
          "messageAttributes": {
              "RiderID": {
                  "stringValue": "1",
                  "stringListValues": [],
                  "binaryListValues": [],
                  "dataType": "String"
              },
              "id": {
                  "stringValue": "123",
                  "stringListValues": [],
                  "binaryListValues": [],
                  "dataType": "Number"
              }
          },
          "md5OfBody": "27f39e9680c80ae48cefd781c13e1f55",
          "md5OfMessageAttributes": "421cbc454bb21609b5267627cca01231",
          "eventSource": "aws:sqs",
          "eventSourceARN": "arn:aws:sqs:us-west-2:085991549361:OCDCyclistRequestActivityDetail",
          "awsRegion": "us-west-2"
      }
  ]
}