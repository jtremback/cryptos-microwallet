Create: 

  Serverside:
    POST /api/v1/:id/:wallet/create
      ?secret
      &coin

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 0,
            "address": he38
          }
        }
      }
    }

  Clientside:
    POST /create
      ?coin

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 0,
            "address": he38
          }
        }
      }
    }



View: 

  Serverside: 
    GET /api/v1/:id/:wallet/view
      ?secret

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 20,
            "address": he38
          }
        }
      }
    }

  Clientside:
    GET /view

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 0,
            "address": he38
          }
        }
      }
    }



Move: 

  Serverside:
    POST /api/v1/:id/:wallet/move
      ?secret
      &to_wallet
      &coin
      &amount

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 10,
            "address": he38
          }
        },
        "to_wallet": {
          "BTC": {
            "balance": 10,
            "address": 94io
          }, 
          "DOG": {
            "balance": 10,
            "address": t222
          }
        }
      }
    }

  Clientside:
    POST /move
      ?to_wallet
      &coin
      &amount

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 10,
            "address": he38
          }
        }
      }
    }



Withdraw: 

  Serverside:
    POST /api/v1/:id/:wallet/withdraw
      ?secret
      &to_address
      &coin
      &amount

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 20,
            "address": he38
          }
        }
      }
    }

  Clientside:
    POST /withdraw
      ?to_address
      &coin
      &amount

    response: {
      "status": "OK",
      "message": {
        "wallet": {
          "BTC": {
            "balance": 10,
            "address": 93dh
          }, 
          "DOG": {
            "balance": 20,
            "address": he38
          }
        }
      }
    }