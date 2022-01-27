const config = {
  "Public": {
    "Services": {
      "endpoint": {
        "protocol": "https",
        "hostname": "api.uncleboost.com",
        "port": 443,
        "context": "/integration/"
      }
    },
    "Mobile": {
      "endpoint": {
        "protocol": "exp",
        "hostname": "exp.host",
        "port": null,
        "context": "/@hirenzess/zess-mobile/"
      }
    },
    "Assets": {
      "endpoint": {
        "protocol": "https",
        "hostname": "static.cdnuncleboost.com",
        "port": null,
        "context": "/public/"
      }
    }
  }
}

export default config