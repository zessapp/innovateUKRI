const config = {
  "Public": {
    "Services": {
      "endpoint": {
        "protocol": "https",
        "hostname": "localhost.uncleboost.com",
        "port": 443,
        "context": "/"
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
        "hostname": "localhost.uncleboost.com",
        "port": null,
        "context": "/public/"
      }
    }
  }
}

export default config