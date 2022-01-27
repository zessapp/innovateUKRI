const config = {
  "Public": {
    "Services": {
      "endpoint": {
        "protocol": "https",
        "hostname": "api.zess.co",
        "port": 443,
        "context": "/"
      }
    },
    "Mobile": {
      "endpoint": {
        "protocol": "zess",
        "hostname": "app.mobile",
        "port": null,
        "context": "/verify-email/"
      }
    },
    "Assets": {
      "endpoint": {
        "protocol": "https",
        "hostname": "static.cdnzess.co",
        "port": null,
        "context": "/public/"
      }
    }
  }
}

export default config