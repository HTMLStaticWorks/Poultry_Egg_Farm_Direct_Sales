import glob
import re

html_files = glob.glob('d:/projects/Trekking & Hiking Tour Company web/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Buttons
    content = re.sub(r'(id="theme-toggle"([^>]*))>', r'\1 aria-label="Toggle Dark/Light Mode">', content)
    content = re.sub(r'(id="rtl-toggle"([^>]*))>', r'\1 aria-label="Toggle RTL Layout">', content)
    content = re.sub(r'(class="mobile-toggle"([^>]*))>', r'\1 aria-label="Open Mobile Menu">', content)
    
    # Newsletter
    content = re.sub(r'(class="newsletter-form"([^>]*))>', r'\1 aria-label="Newsletter Subscription Form">', content)
    content = re.sub(r'<input type="email" placeholder="Enter your email address"', r'<input type="email" placeholder="Enter your email address" aria-label="Email Address"', content)
    
    # Generic Blog alt
    content = re.sub(r'alt="Blog"', r'alt="Blog post thumbnail"', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Accessibility patched successfully.")
