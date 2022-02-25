from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    help = 'Create users to test'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        User.objects.all().delete()
        count = options['count']
        superuser = User(
            # данные суперпользователя
            username='django',
            email='django@gb.local',
            first_name='Джанго',
            last_name='Фреймворков',
        )
        superuser.set_password('geekbrains')
        superuser.is_superuser = True
        superuser.is_staff = True
        superuser.save()
        for i in range(count):
            user = User.objects.create(
                username=f'uname{i}',
                first_name=f'fname{i}',
                last_name=f'lname{i}',
                email=f'user{i}@gb.local')
            print(f'author {user.first_name} created')
        print('done')