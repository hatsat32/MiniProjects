from django.urls import path

from . import views

# name parametresi daha dinamik url oluşturmak içindir

# app_name uygulama isim alanı oluşturmak için
# farıklı uygulamalarda aynı isimde sayfalar varsa karışıklığı engeller
app_name = "polls"

# yeni generic view url pattern
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]


# eski tarz url pattern
"""
urlpatterns = [
    path('', views.index, name='index'),
    path("<int:question_id>/", views.detail, name="detail"), # /polls/5/
    path("<int:question_id>/results/", views.results, name="results"), # /polls/5/results
    path("<int:question_id>/vote/", views.vote, name="vote"), # /polls/5/vote
]
"""
