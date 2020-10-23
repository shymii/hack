from django.shortcuts import redirect

def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('homepage')
        else:
            return view_func(request, *args, **kwargs)     
    return wrapper_func

def is_admin(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_staff:
            return view_func(request, *args, **kwargs)
        else:
            return redirect('homepage')
    return wrapper_func

def is_not_session(view_func):
    def wrapper_func(request, *args, **kwargs):
        if not 'browse_mode' in request.session:
            request.session['browse_mode'] = 'light'
        return view_func(request, *args, **kwargs)
    return wrapper_func