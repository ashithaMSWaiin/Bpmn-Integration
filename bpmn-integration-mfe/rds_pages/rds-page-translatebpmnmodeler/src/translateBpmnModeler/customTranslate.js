// src/customTranslate/customTranslate.js

const customTranslations = {
    'Exclusive gateway': 'Exklusives Gateway',
  'Parallel gateway': 'Paralleles Gateway',
  'Inclusive gateway': 'Inklusives Gateway',
  'Complex gateway': 'Komplexes Gateway',
  'Event based gateway': 'Ereignis-basiertes Gateway',
  'Message Start Event': '消息启动事件',
  'Timer Start Event': '定时启动事件',
  'Conditional Start Event': '条件启动事件',
  'Signal Start Event': '信号启动事件',
  'Error Start Event': '错误启动事件',
  'Escalation Start Event': '升级启动事件',
  'Compensation Start Event': '补偿启动事件',
  'Message Start Event (non-interrupting)': '消息启动事件 (非中断)',
  'Timer Start Event (non-interrupting)': '定时启动事件 (非中断)',
  'Conditional Start Event (non-interrupting)': '条件启动事件 (非中断)',
  'Signal Start Event (non-interrupting)': '信号启动事件 (非中断)',
  'Escalation Start Event (non-interrupting)': '升级启动事件 (非中断)',
};

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate from custom dictionary or fall back to original
  template = customTranslations[template] || template;

  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}';
  });
}
