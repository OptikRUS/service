from rest_framework.serializers import ModelSerializer

from users.models import User
from profiles.models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('name', 'user', 'text', 'update_at', 'is_active')
