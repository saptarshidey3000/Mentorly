import urllib.parse

def encode_image_url_param(url: str) -> str:
    """
    Extracts the image1 parameter value from a query string URL and returns the URL-encoded version.
    """
    parsed_url = urllib.parse.urlparse(url)
    query_params = urllib.parse.parse_qs(parsed_url.query)

    if "image1" not in query_params:
        raise ValueError("URL must contain an image1 parameter.")

    # Extract and encode the image1 value
    image1_value = query_params["image1"][0]

    encoded_image1 = urllib.parse.quote(image1_value, safe='')

    # Rebuild the URL
    encoded_query = f"image1={encoded_image1}"
    return f"{parsed_url.path}?{encoded_query}"