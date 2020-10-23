def is_not_session(view_func):
    def wrapper_func(request, *args, **kwargs):
        if not 'browse_mode' in request.session:
            request.session['browse_mode'] = 'light'
        return view_func(request, *args, **kwargs)
    return wrapper_func