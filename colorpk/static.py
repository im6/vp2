from django.http import HttpRequest, HttpResponse, HttpResponseNotFound, FileResponse

def sendSitemap(request: HttpRequest) -> HttpResponse:
    img = open('static/sitemap.xml', 'rb')
    return FileResponse(img)
