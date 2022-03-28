from rest_framework.serializers import ModelSerializer, StringRelatedField, HyperlinkedModelSerializer

from users.models import User
from users.serializers import UserModelSerializer
from profiles.models import Project, ToDo


class UserListModelSerializer(UserModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ToDoListSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ('url', 'update_at', 'is_active')


class ProjectModelSerializer(ModelSerializer):
    users = UserListModelSerializer(many=True)
    todo_list = ToDoListSerializer(many=True)

    class Meta:
        model = Project
        fields = ('name', 'url', 'created_at', 'users', 'todo_list')


class ToDoModelSerializer(HyperlinkedModelSerializer):
    user = StringRelatedField()
    project = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
