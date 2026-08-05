import base64
import os

# 1. Read the user uploaded image
img_path = '/Users/germangonzalez/.gemini/antigravity/brain/be64703e-dfe0-4456-86ca-6369fa1fd4fe/.user_uploaded/media__1785931562346.jpg'
with open(img_path, 'rb') as f:
    b64_str = base64.b64encode(f.read()).decode('utf-8')
data_uri = f'data:image/jpeg;base64,{b64_str}'

# 2. Also ensure local files exist
os.makedirs('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/public', exist_ok=True)
with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/public/german_portrait.jpg', 'wb') as f:
    with open(img_path, 'rb') as orig:
        f.write(orig.read())
with open('/Users/germangonzalez/.gemini/antigravity/scratch/german-landing/german_portrait.jpg', 'wb') as f:
    with open(img_path, 'rb') as orig:
        f.write(orig.read())

print("Photo successfully converted to Base64 data URI (length:", len(data_uri), ")")
