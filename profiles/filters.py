from django_filters import CharFilter
from django_filters.rest_framework import FilterSet

from profiles.models import Project


class ProjectsFilter(FilterSet):
    name = CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']
