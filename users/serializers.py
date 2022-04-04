from rest_framework.serializers import HyperlinkedModelSerializer
from users.models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'url', 'username', 'first_name', 'last_name', 'email')
