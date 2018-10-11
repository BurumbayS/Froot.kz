from django.urls import path, include
from invoices import views


urlpatterns = [
    path('invoices/', views.getInvoices),
    path('invoices/add/', views.addNewInvoice),
]
