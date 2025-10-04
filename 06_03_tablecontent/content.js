    // 目次ボックスを作成する関数
    function createTableOfContents() {
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        
        const header = document.createElement('div');
        header.className = 'toc-header';
        
        const title = document.createElement('h3');
        title.className = 'toc-title';
        title.textContent = '目次';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'toc-close';
        closeButton.textContent = '×';
        closeButton.onclick = () => toc.remove();
        
        const content = document.createElement('div');
        content.className = 'toc-content';
        
        const list = document.createElement('ul');
        list.className = 'toc-list';
        
        // 見出しを取得して目次を作成
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            // 見出しにIDがない場合は追加
            if (!heading.id) {
                heading.id = 'heading-' + Math.random().toString(36).substring(2, 11);
            }
            
            const item = document.createElement('li');
            item.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
            item.textContent = heading.textContent;
            
            item.onclick = () => {
                heading.scrollIntoView({ behavior: 'smooth' });
            };
            
            list.appendChild(item);
        });
        
        content.appendChild(list);
        header.appendChild(title);
        header.appendChild(closeButton);
        toc.appendChild(header);
        toc.appendChild(content);
        document.body.appendChild(toc);
        
        // ドラッグ機能の実装
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        
        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        
        function dragStart(e) {
            initialX = e.clientX - toc.offsetLeft;
            initialY = e.clientY - toc.offsetTop;
            
            if (e.target === header) {
                isDragging = true;
            }
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                toc.style.left = currentX + 'px';
                toc.style.top = currentY + 'px';
            }
        }
        
        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }
    }

    // ページ読み込み完了時に目次を作成
    window.addEventListener('load', createTableOfContents); 