from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from profiles.models import Project, ToDo
from profiles.serializers import ProjectModelSerializer, ToDoModelSerializer
from profiles.filters import ProjectsFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


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
