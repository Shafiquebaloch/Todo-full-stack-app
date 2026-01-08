---
id: 0011
title: Explain benign CancelledError during backend shutdown
stage: general
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: UMAIR
command: resolve these backend errors """
  C:\Users\UMAIR\Desktop\Todo-full-stack-app>uvicorn backend.main:app --reload --port 8000
  INFO:     Will watch for changes in these directories: ['C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app']
  INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
  INFO:     Started reloader process [31172] using WatchFiles
  INFO:     Started server process [8864]
  INFO:     Waiting for application startup.
  2026-01-02 14:19:07,111 INFO sqlalchemy.engine.Engine select pg_catalog.version()
  2026-01-02 14:19:07,112 INFO sqlalchemy.engine.Engine [raw sql] {}
  2026-01-02 14:19:07,499 INFO sqlalchemy.engine.Engine select current_schema()
  2026-01-02 14:19:07,500 INFO sqlalchemy.engine.Engine [raw sql] {}
  2026-01-02 14:19:07,886 INFO sqlalchemy.engine.Engine show standard_conforming_strings
  2026-01-02 14:19:07,887 INFO sqlalchemy.engine.Engine [raw sql] {}
  2026-01-02 14:19:08,274 INFO sqlalchemy.engine.Engine BEGIN (implicit)
  2026-01-02 14:19:08,277 INFO sqlalchemy.engine.Engine SELECT pg_catalog.pg_class.relname
  FROM pg_catalog.pg_class JOIN pg_catalog.pg_namespace ON pg_catalog.pg_namespace.oid = pg_catalog.pg_class.relnamespace
  WHERE pg_catalog.pg_class.relname = %(table_name)s AND pg_catalog.pg_class.relkind = ANY (ARRAY[%(param_1)s, %(param_2)s, %(param_3)s, %(param_4)s, %(param_5)s]) AND pg_catalog.pg_table_is_visible(pg_catalog.pg_class.oid) AND pg_catalog.pg_namespace.nspname != %(nspname_1)s
  2026-01-02 14:19:08,278 INFO sqlalchemy.engine.Engine [generated in 0.00057s] {'table_name': 'user', 'param_1': 'r', 'param_2': 'p', 'param_3': 'f', 'param_4': 'v', 'param_5': 'm', 'nspname_1': 'pg_catalog'}
  2026-01-02 14:19:08,666 INFO sqlalchemy.engine.Engine SELECT pg_catalog.pg_class.relname
  FROM pg_catalog.pg_class JOIN pg_catalog.pg_namespace ON pg_catalog.pg_namespace.oid = pg_catalog.pg_class.relnamespace
  WHERE pg_catalog.pg_class.relname = %(table_name)s AND pg_catalog.pg_class.relkind = ANY (ARRAY[%(param_1)s, %(param_2)s, %(param_3)s, %(param_4)s, %(param_5)s]) AND pg_catalog.pg_table_is_visible(pg_catalog.pg_class.oid) AND pg_catalog.pg_namespace.nspname != %(nspname_1)s
  2026-01-02 14:19:08,667 INFO sqlalchemy.engine.Engine [cached since 0.3894s ago] {'table_name': 'task', 'param_1': 'r', 'param_2': 'p', 'param_3': 'f', 'param_4': 'v', 'param_5': 'm', 'nspname_1': 'pg_catalog'}
  2026-01-02 14:19:08,861 INFO sqlalchemy.engine.Engine COMMIT
  INFO:     Application startup complete.
  INFO:     Shutting down
  INFO:     Shutting down
  INFO:     Finished server process [27420]
  INFO:     Finished server process [8864]
  ERROR:    Traceback (most recent call last):
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\starlette\routing.py", line 701, in lifespan
      await receive()
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\lifespan\on.py", line 137, in receive
      return await self.receive_queue.get()
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\queues.py", line 186, in get
      await getter
  asyncio.exceptions.CancelledError

  ERROR:    Traceback (most recent call last):
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\starlette\routing.py", line 701, in lifespan
      await receive()
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\lifespan\on.py", line 137, in receive
      return await self.receive_queue.get()
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\queues.py", line 186, in get
      await getter
  asyncio.exceptions.CancelledError""
labels: ["backend", "error-explanation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: []
tests_yaml: []
prompt_text: |
  resolve these backend errors """
  C:\Users\UMAIR\Desktop\Todo-full-stack-app>uvicorn backend.main:app --reload --port 8000
  INFO:     Will watch for changes in these directories: ['C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app']
  INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
  INFO:     Started reloader process [31172] using WatchFiles
  INFO:     Started server process [8864]
  INFO:     Waiting for application startup.
  2026-01-02 14:19:07,111 INFO sqlalchemy.engine.Engine select pg_catalog.version()
  2026-01-02 14:19:07,112 INFO sqlalchemy.engine.Engine [raw sql] {}
  2026-01-02 14:19:07,499 INFO sqlalchemy.engine.Engine select current_schema()
  2026-01-02 14:19:07,500 INFO sqlalchemy.engine.Engine [raw sql] {}
  2026-01-02 14:19:07,886 INFO sqlalchemy.engine.Engine show standard_conforming_strings
  2026-01-02 14:19:07,887 INFO sqlalchemy.engine.Engine [raw sql] {}
  2026-01-02 14:19:08,274 INFO sqlalchemy.engine.Engine BEGIN (implicit)
  2026-01-02 14:19:08,277 INFO sqlalchemy.engine.Engine SELECT pg_catalog.pg_class.relname
  FROM pg_catalog.pg_class JOIN pg_catalog.pg_namespace ON pg_catalog.pg_namespace.oid = pg_catalog.pg_class.relnamespace
  WHERE pg_catalog.pg_class.relname = %(table_name)s AND pg_catalog.pg_class.relkind = ANY (ARRAY[%(param_1)s, %(param_2)s, %(param_3)s, %(param_4)s, %(param_5)s]) AND pg_catalog.pg_table_is_visible(pg_catalog.pg_class.oid) AND pg_catalog.pg_namespace.nspname != %(nspname_1)s
  2026-01-02 14:19:08,278 INFO sqlalchemy.engine.Engine [generated in 0.00057s] {'table_name': 'user', 'param_1': 'r', 'param_2': 'p', 'param_3': 'f', 'param_4': 'v', 'param_5': 'm', 'nspname_1': 'pg_catalog'}
  2026-01-02 14:19:08,666 INFO sqlalchemy.engine.Engine SELECT pg_catalog.pg_class.relname
  FROM pg_catalog.pg_class JOIN pg_catalog.pg_namespace ON pg_catalog.pg_namespace.oid = pg_catalog.pg_class.relnamespace
  WHERE pg_catalog.pg_class.relname = %(table_name)s AND pg_catalog.pg_class.relkind = ANY (ARRAY[%(param_1)s, %(param_2)s, %(param_3)s, %(param_4)s, %(param_5)s]) AND pg_catalog.pg_table_is_visible(pg_catalog.pg_class.oid) AND pg_catalog.pg_namespace.nspname != %(nspname_1)s
  2026-01-02 14:19:08,667 INFO sqlalchemy.engine.Engine [cached since 0.3894s ago] {'table_name': 'task', 'param_1': 'r', 'param_2': 'p', 'param_3': 'f', 'param_4': 'v', 'param_5': 'm', 'nspname_1': 'pg_catalog'}
  2026-01-02 14:19:08,861 INFO sqlalchemy.engine.Engine COMMIT
  INFO:     Application startup complete.
  INFO:     Shutting down
  INFO:     Shutting down
  INFO:     Finished server process [27420]
  INFO:     Finished server process [8864]
  ERROR:    Traceback (most recent call last):
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\starlette\routing.py", line 701, in lifespan
      await receive()
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\lifespan\on.py", line 137, in receive
      return await self.receive_queue.get()
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\queues.py", line 186, in get
      await getter
  asyncio.exceptions.CancelledError

  ERROR:    Traceback (most recent call last):
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\starlette\routing.py", line 701, in lifespan
      await receive()
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\lifespan\on.py", line 137, in receive
      return await self.receive_queue.get()
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\queues.py", line 186, in get
      await getter
  asyncio.exceptions.CancelledError"""
outcome: success
evaluation:
---
