from django.shortcuts import render
from .models import Invoice
from .serializers import InvoiceSerializer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def getInvoices(request) :
    invoices = reversed(list(Invoice.objects.all()))
    data = InvoiceSerializer(invoices, many=True)

    return JsonResponse(data.data, safe=False)

@csrf_exempt
def addNewInvoice(request) :
    value = JSONParser().parse(request)
    serializer = InvoiceSerializer(data = value)
    if serializer.is_valid():
        serializer.save()
        print("saved")
        return JsonResponse(serializer.data, status=200)
    return JsonResponse(serializer.errors, status=400)
