import requests
from io import BytesIO
from PIL import Image

def show_random_dog():
    url = "https://dog.ceo/api/breeds/image/random"
    response = requests.get(url)
    response.raise_for_status()

    # API returns {"message": "<image_url>", "status": "success"}
    img_url = response.json()["message"]

    # Fetch the actual image
    img_data = requests.get(img_url).content
    img = Image.open(BytesIO(img_data))

    img.show()  # opens in Preview on macOS

if __name__ == "__main__":
    show_random_dog()