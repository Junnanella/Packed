from db import CurrencyQueries


def test_structure_queries():
    # ARRANGE
    correct_countries = {
        "id": 32,
        "currency_code": "EUR",
        "country": "Germany",
    }
    input_data = [
        32,
        "EUR",
        "Germany",
    ]

    # ACT
    result = CurrencyQueries.structure_countries(self=[], country=input_data)

    # ASSERT
    assert result == correct_countries
