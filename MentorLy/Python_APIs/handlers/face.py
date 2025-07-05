import os
from deepface import DeepFace
import dotenv
dotenv.load_dotenv()
path = os.getenv("PDF_FILE_PATH")

def mtcnn_comp(img1:str,img2:str):
    backends = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface', 'mediapipe']
    result = DeepFace.verify(img1_path=path+"\\"+img1, img2_path=path+"\\"+img2, detector_backend=backends[3],threshold=0.50)
    print((result))
    return result
