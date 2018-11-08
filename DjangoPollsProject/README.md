# Django Tutorial Poll uygulaması

Bu proje Django öğrenirken Djangonun resmi tutorialini takip ederken yaptığım bir projedir. Django turorial deki projenin tam ve çalışan halidir. Bu tutoriale [buradan](https://docs.djangoproject.com/en/2.1/intro/) ulaşabilirsiniz.

Ayrıca polls uygulamasının pip ile kurulum için paketlenmiş hali `django-polls` dizini içindedir. Bu uygulamayı şu komut ile kurabilirsiniz.

```
pip install --user django-polls/dist/django-polls-0.1.tar.gz
```

## Projenin Özellikleri

* İnsanların ankatleri görebilir.
* İnsanların ankatleri doldurabilir.
* Admin sitesi ile anket ekleme, silme, düzenleme işlemleri yapılabilir.


## Bağımlılıklar

* Django 2.1

## Kurulum

Eğer django kurulu değilse şu komutla kurabilirsiniz.

```
pip install django
```

Django kurulumunu tamamladıktan sonra proje dizinini istediğiniz bir dizine taşıyın. Ardından terminal üzerinden `mysite/` dizinine yani `manage.py` nin bulunduğu dizine girin. Veritabanını oluşturmak için şu 2 komutu girin.

```
python manage.py makemigrations
python manage.py migrate
```

Veritabanı oluşacaktır. Ardından bir `superuser` oluşturmalıyız. Admin arayüzüne girmek için.

```
python manage.py createsuperuser
```

Gerekli bilgileri girdikten ve admin hesabını oluşturduktan sonra artık projeyi çalıştırabiliriz.

```
python manage.py runserver
```