from django_filters import CharFilter, BooleanFilter, DateTimeFromToRangeFilter
from django_filters.rest_framework import FilterSet
from django_filters.widgets import RangeWidget, BooleanWidget

from profiles.models import Project, ToDo


class ProjectsFilter(FilterSet):
    name = CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(FilterSet):
    project_id__name = CharFilter(lookup_expr='contains')
    created_at = DateTimeFromToRangeFilter(widget=RangeWidget(attrs={'placeholder': 'YYYY-MM-DD HH:MM:SS'}))
    is_active = BooleanFilter(widget=BooleanWidget())

    class Meta:
        model = ToDo
        fields = ['project_id__name', 'created_at', 'is_active']
