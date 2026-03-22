import zipfile
import xml.etree.ElementTree as ET
import sys

def read_docx(path):
    try:
        with zipfile.ZipFile(path) as docx:
            tree = ET.parse(docx.open('word/document.xml'))
            root = tree.getroot()
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text_blocks = []
            for paragraph in root.iter(f"{{{namespaces['w']}}}p"):
                para_text = []
                for node in paragraph.iter(f"{{{namespaces['w']}}}t"):
                    if node.text:
                        para_text.append(node.text)
                if para_text:
                    text_blocks.append(''.join(para_text))
            
            print('\n'.join(text_blocks))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    read_docx(sys.argv[1])
