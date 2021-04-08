function initialState() {
        if (localStorage.getItem('comments') == null) {
            $('.comments_none').show()
        } else {
            $('.comments_list').html(localStorage.getItem('comments'))
            $('.comments_none').hide()
        }
    }
    function addToStorage() {
        let content = $('.comments_list').html()
        localStorage.setItem('comments', content)
    }
    function addComment(e) {
        let name = $(".input").val(),
            text = $('.textarea').val(),
            date = new Date().toLocaleDateString();
        if (name && text) {
            $('input').removeClass('error')
            $('textarea').removeClass('error')
            $('.comments_list').append(`
                    <div class="comments_item">
                        <button class="comment_delete">&times;</button>
                        <div style="display:flex; flex-direction:row;">
                        <div class="" style="margin-right:1rem;"><i class="bi bi-person-fill text-primary"></i></div> 
                        <div class="comments_author" style="font-style: oblique; font-size:14px;text-transform:uppercase;">${name}</div>
                        </div>
                        <hr/>
                        <div class="comments_text">${text}</div>
                        <div style="display:flex; justify-content:end; float:right">
                        <div class="" style="margin-right:1rem; margin-top:-5px;"><i class="bi bi-calendar-event-fill"></i></div> 
                        <div class="comments_date" style="font-style: oblique; font-weight:bold; font-size:12px;">${date}</div>
                        </div>
    
                    </div>
                `)
            $('.comments_none').hide()
    
            name = $('input').val('')
            text = $('textarea').val('')
            addToStorage()
        } else {
            $('.comment-input').addClass('error')
            $('.comment-textarea').addClass('error')
        }
    }
    function deleteComment(item) {
        item.remove();
        let items = $('.comments_item')
        addToStorage()
        if (items.length === 0) {
            $('.comments_none').show()
            localStorage.removeItem('comments')
        } else {
            $('.comments_none').hide()
        }
    }
    $('body').on('click', '.btn-send', addComment)
    $('body').on('click', '.comment_delete', function () {
        let item = $(this).parents('.comments_item')
        deleteComment(item)
    });