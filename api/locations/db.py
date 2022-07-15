from psycopg_pool import ConnectionPool
import os

try:
    pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
except KeyError:
    pool = None

class CurrencyQueries:
    def structure_countries(self, country:list):
        try:
            return {
                "id": country[0],
                "currency_code": country[1],
                "country": country[2],
            }
        except IndexError:
            return {"warning": "impropertly formatted country."}

    def get_list_from_db(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        SELECT id
                        , currency_code
                        , country
                        FROM currency;
                    """
                )
                results = []
                countries =  cur.fetchall()
                for country in countries:
                    formatted_country = self.structure_countries(country)
                    if "warning" in formatted_country:
                        return []
                    results.append(formatted_country)
                return results
