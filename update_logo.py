import os
import glob

html_files = glob.glob('d:/projects/Trekking & Hiking Tour Company web/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update footer logo
    new_content = content.replace(
        'class="logo" style="margin-bottom: 20px; display: block;"',
        'class="logo" style="margin-bottom: 20px; display: inline-flex;"'
    )
    
    # For login and signup, I already removed the image, so I don't need to do anything there unless it has display: block. They don't.
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

# Update responsive.css
css_path = 'd:/projects/Trekking & Hiking Tour Company web/css/responsive.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

new_css_content = css_content.replace(
    '  .header .logo {\n    font-size: 1.5rem;\n    line-height: 1.2;\n    display: inline-block;\n  }',
    '  .header .logo {\n    font-size: 1.5rem;\n    line-height: 1.2;\n    display: inline-flex;\n  }'
)

if new_css_content != css_content:
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(new_css_content)
    print(f"Updated {css_path}")

print("Done")
