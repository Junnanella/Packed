from django.test import TestCase, SimpleTestCase
from django.http import JsonResponse
import json
from ..views import (
    model_instance_does_not_exist_message,
    field_does_not_exist_error,
    type_error_message,
)

# Create your tests here.

class HelperFunctionTests(SimpleTestCase):
    def test_field_does_not_exist_error(self):
        # ARRANGE
        expected_message = {"message": "Invalid field name"}
        expected_status_code = 400

        # ACT
        result = field_does_not_exist_error()

        # ASSERT
        result_content = json.loads(result.content)
        self.assertEqual(result.status_code, expected_status_code)
        self.assertEqual(result_content, expected_message)


    def test_model_instance_does_not_exist_message(self):
        # ARRANGE
        expected_message = {"message": "'Item' with id number of '69' does not exist"}
        expected_status_code = 400
        model, id = "Item", 69

        # ACT
        result = model_instance_does_not_exist_message(model, id)

        # ASSERT
        result_message = json.loads(result.content)
        self.assertEqual(result.status_code, expected_status_code)
        self.assertEqual(result_message, expected_message)

    def test_type_error_message(self):
        # ARRANGE
        expected_message = {'message': "Failed to create 'Item' instance"}
        expected_status_code = 400
        model = "Item"

        # ACT
        result = type_error_message(model)

        # ASSERT
        result_message = json.loads(result.content)
        self.assertEqual(result_message, expected_message)
        self.assertEqual(result.status_code, expected_status_code)
