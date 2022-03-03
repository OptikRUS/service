from django.core.management.base import BaseCommand
from django.db import transaction

import factory
from factory.django import DjangoModelFactory

from profiles.models import ToDo
from users.models import User


class ToDoFactory(DjangoModelFactory):
    class Meta:
        model = ToDo

    user = factory.Iterator([i for i in User.objects.all()])
    name = factory.Faker('company')
    text = factory.Faker('text')
    is_active = factory.Faker('pybool')
    created_at = factory.Faker('date_time')
    update_at = factory.Faker('date_time')


class Command(BaseCommand):
    help = 'Create todos to test'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Deleting old data...")
        ToDo.objects.all().delete()
        count = options['count']
        self.stdout.write("Creating new todos...")
        todos = []
        for _ in range(count):
            todo = ToDoFactory()
            todos.append(todo)
            print(f'todo "{todo.name}" создан')
        print('Done!')
