{% for project in site.projects %}
## {{ project.title }}

{{ project.description }}

{% for link in project.links %}
<a class="button button-1" href="{{ link.url }}" target="_blank"><i class="fa fa-{{ link.icon}} fa-md"></i> {{ link.label }}</a>
{% endfor %}

{% endfor %}