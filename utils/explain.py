def explain_risk_factors(user_input, normal_ranges):
    explanations = []
    for feature, value in user_input.items():
        if feature in normal_ranges:
            normal = normal_ranges[feature]
            if value < normal[0]:
                explanations.append(f"Low {feature} ({value})")
            elif value > normal[1]:
                explanations.append(f"High {feature} ({value})")
    return explanations
