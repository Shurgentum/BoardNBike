# BoardNBike
![](https://img.shields.io/badge/Docker%20build-pass-green)
![](https://img.shields.io/badge/build-pass-green)
![](https://img.shields.io/badge/license-GPLv3.0-orange)

BoardNBike online shop project repository

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```bash
git clone git@github.com:Shurgentum/RLMS.git &&\
cd RLMS && docker-compose up && npm install && npm run watch-sass && npm start
```

### Prerequisites:

What software you need to install:

[![](https://img.shields.io/badge/Node-12+-green)](https://nodejs.org/) - Javascript runtime

[![](https://img.shields.io/badge/Docker-18+-informational)](https://www.docker.com) - Container tool


## Installation

### Windows/Mac:
  [Download](https://www.docker.com/get-started)

### Docker CE for Linux installation script:
* Docker executable:
```bash
curl -sSL https://get.docker.com | sh
```
* Docker compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
## Deployment
```bash
git clone git@github.com:Shurgentum/RLMS.git &&\
cd RLMS && npm install && npm run compile-sass && npm start
```


## Authors

* **Kirill Asieiev @Shurgentum** - *Initial work* - [GitHub](https://github.com/Shurgentum)


## License

This project is licensed under the GPLv3.0 License - see the [LICENSE](LICENSE) file for details