import yaml

class Config():

    def __init__(self):

        with open('../appconfig.yaml', 'r') as file:
            configData = yaml.safe_load(file)
            self.urlApi = configData["urlApi"]

config = Config()