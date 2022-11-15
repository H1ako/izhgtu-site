from django.db import models
from django.utils.translation import gettext_lazy as _

from izhgtuSite.models import TimeStampedModel
from users.models import User


class DateEventPost(TimeStampedModel):
    author = models.ForeignKey(
        User,
        verbose_name=_('Author'),
        related_name='dateEventPosts',
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        verbose_name = _('Date Event Post')
        verbose_name_plural = _('Date Event Posts')


class DateEvent(TimeStampedModel):
    date = models.DateTimeField(_('Date'))
    post = models.ForeignKey(
        DateEventPost,
        verbose_name=_('Post'),
        on_delete=models.SET_NULL,
        related_name='dateEvent',
        null=True
    )
    name = models.CharField(_('Name'), max_length=150)
    description = models.CharField(_('Description'), max_length=255)
    picture = models.ImageField(_('Picture'), upload_to='dateEventsPictures/')

    class Meta:
        verbose_name = _('Date Event')
        verbose_name_plural = _('Date Events')

