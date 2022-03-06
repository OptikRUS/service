from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from profiles.models import Project, ToDo
from profiles.serializers import ProjectModelSerializer, ToDoModelSerializer
from profiles.filters import ProjectsFilter, ToDoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectsFilter
    pagination_class = ProjectLimitOffsetPagination

    # same as profiles.filters.ProjectFilter
    # def get_queryset(self):
    #     name = self.request.query_params.get('name', '')
    #     projects = Project.objects.all()
    #     if name:
    #         projects = projects.filter(name__contains=name)
    #     return projects


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, pk=None, **kwargs):
        todo = get_object_or_404(ToDo, pk=pk)
        todo.is_active = False
        todo.save()
        return Response(ToDoModelSerializer(todo, context={'request': request}).data)
