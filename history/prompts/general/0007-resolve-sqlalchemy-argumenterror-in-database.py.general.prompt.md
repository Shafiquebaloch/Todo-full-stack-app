---
id: 0007
title: Resolve SQLAlchemy ArgumentError in database.py
stage: general
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: UMAIR
command: check @backend/main.py and relove this error """ers\UMAIR\Desktop\Todo-full-stack-app>uvicorn backend.main:app --reload --port 8000
INFO:     Will watch for changes in these directories: ['C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [24952] using WatchFiles
Process SpawnProcess-1:
Traceback (most recent call last):
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\multiprocessing\\process.py", line 313, in _bootstrap
    self.run()
    ~~~~~~~~^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\multiprocessing\\process.py", line 108, in run
    self._target(*self._args, **self._kwargs)
    ~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\_subprocess.py", line 78, in subprocess_started
    target(sockets=sockets)
    ~~~~~~^^^^^^^^^^^^^^^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\server.py", line 62, in run
    return asyncio.run(self.serve(sockets=sockets))
           ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\asyncio\\runners.py", line 195, in run
    return runner.run(main)
           ~~~~~~~~~~^^^^^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\asyncio\\runners.py", line 118, in run
    return self._loop.run_until_complete(task)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\asyncio\\base_events.py', line 725, in run_until_complete
    return future.result()
           ~~~~~~~~~~~~~^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\server.py", line 69, in serve
    config.load()
    ~~~~~~~~~~~^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\config.py", line 458, in load
    self.loaded_app = import_from_string(self.app)
                      ~~~~~~~~~~~~~~~~~~^^^^^^^^^^
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\importer.py", line 21, in import_from_string
    module = importlib.import_module(module_str)
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\importlib\\__init__.py", line 88, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
           ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap>", line 1387, in _gcd_import
  File "<frozen importlib._bootstrap>", line 1360, in _find_and_load
  File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 935, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 1026, in exec_module
  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
  File "C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app\\backend\\main.py', line 6, in <module>
    from backend.database import engine
  File "C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app\\backend\\database.py', line 9, in <module>
    engine = create_engine(DATABASE_URL, echo=True)
  File "<string>", line 2, in create_engine
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\sqlalchemy\\util\\deprecations.py", line 281, in warned
    return fn(*args, **kwargs)  # type: ignore[no-any-return]
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\sqlalchemy\\engine\\create.py", line 564, in create_engine
    u = _url.make_url(url)
  File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\sqlalchemy\\engine\\url.py", line 860, in make_url
    raise exc.ArgumentError(
        f"Expected string or URL object, got {name_or_url!r}"
    )
sqlalchemy.exc.ArgumentError: Expected string or URL object, got None"""
labels: ["bug-fix", "backend"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - backend/main.py
  - backend/database.py
tests_yaml: []
prompt_text: |
  check @backend/main.py and relove this error """ers\UMAIR\Desktop\Todo-full-stack-app>uvicorn backend.main:app --reload --port 8000
  INFO:     Will watch for changes in these directories: ['C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app']
  INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
  INFO:     Started reloader process [24952] using WatchFiles
  Process SpawnProcess-1:
  Traceback (most recent call last):
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\multiprocessing\\process.py", line 313, in _bootstrap
      self.run()
      ~~~~~~~~^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\multiprocessing\\process.py", line 108, in run
      self._target(*self._args, **self._kwargs)
      ~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\_subprocess.py", line 78, in subprocess_started
      target(sockets=sockets)
      ~~~~~~^^^^^^^^^^^^^^^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\server.py", line 62, in run
      return asyncio.run(self.serve(sockets=sockets))
             ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\asyncio\\runners.py", line 195, in run
      return runner.run(main)
             ~~~~~~~~~~^^^^^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\asyncio\\runners.py", line 118, in run
      return self._loop.run_until_complete(task)
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\asyncio\\base_events.py", line 725, in run_until_complete
      return future.result()
             ~~~~~~~~~~~~~^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\server.py", line 69, in serve
      config.load()
      ~~~~~~~~~~~^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\config.py", line 458, in load
      self.loaded_app = import_from_string(self.app)
                        ~~~~~~~~~~~~~~~~~~^^^^^^^^^^
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\uvicorn\\importer.py", line 21, in import_from_string
      module = importlib.import_module(module_str)
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\importlib\\__init__.py", line 88, in import_module
      return _bootstrap._gcd_import(name[level:], package, level)
             ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "<frozen importlib._bootstrap>", line 1387, in _gcd_import
    File "<frozen importlib._bootstrap>", line 1360, in _find_and_load
    File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked
    File "<frozen importlib._bootstrap>", line 935, in _load_unlocked
    File "<frozen importlib._bootstrap_external>", line 1026, in exec_module
    File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
    File "C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app\\backend\\main.py", line 6, in <module>
      from backend.database import engine
    File "C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app\\backend\\database.py", line 9, in <module>
      engine = create_engine(DATABASE_URL, echo=True)
    File "<string>", line 2, in create_engine
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\sqlalchemy\\util\\deprecations.py", line 281, in warned
      return fn(*args, **kwargs)  # type: ignore[no-any-return]
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\sqlalchemy\\engine\\create.py", line 564, in create_engine
      u = _url.make_url(url)
    File "C:\\Users\\UMAIR\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\sqlalchemy\\engine\\url.py", line 860, in make_url
      raise exc.ArgumentError(
          f"Expected string or URL object, got {name_or_url!r}"
      )
sqlalchemy.exc.ArgumentError: Expected string or URL object, got None"""
