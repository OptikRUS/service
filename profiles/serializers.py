from rest_framework.serializers import ModelSerializer, StringRelatedField

from users.models import User
from users.serializers import UserModelSerializer
from profiles.models import Project, ToDo


class UserListModelSerializer(UserModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ProjectModelSerializer(ModelSerializer):
    users = UserListModelSerializer(many=True)

    class Meta:
        model = Project
        fields = ('name', 'url', 'created_at', 'users')


class ToDoModelSerializer(ModelSerializer):
    user = StringRelatedField()

    class Meta:
        model = ToDo
        exclude = ('id',)