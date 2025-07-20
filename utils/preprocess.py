def preprocess_input(data_dict):
    return [float(data_dict[key]) for key in data_dict]
