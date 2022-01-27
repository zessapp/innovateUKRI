from crontab import CronTab
import os

cron = CronTab(user='root')
path = f'{os.getcwd()}/algolia/duplicate_remover.py'
job = cron.new(command=path)
job.minute.every(1)
cron.write()
print('cron.write() was just executed')
