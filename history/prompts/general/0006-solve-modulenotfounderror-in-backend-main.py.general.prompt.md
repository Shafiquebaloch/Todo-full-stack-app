--- 
id: 0006
title: Solve ModuleNotFoundError in backend/main.py
stage: general
date: 2026-01-02
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: UMAIR
command: check @backend/main.py and solve this error
  C:\Users\UMAIR\Desktop\Todo-full-stack-app>cd backend

  C:\Users\UMAIR\Desktop\Todo-full-stack-app\backend>uvicorn main:app --reload --port 8000
  INFO:     Will watch for changes in these directories: ['C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app\\backend']
  INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
  INFO:     Started reloader process [16264] using WatchFiles
  Process SpawnProcess-1:
  Traceback (most recent call last):
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\multiprocessing\process.py", line 313, in _bootstrap
      self.run()
      ~~~~~~~~^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\multiprocessing\process.py", line 108, in run
      self._target(*self._args, **self._kwargs)
      ~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\_subprocess.py", line 78, in subprocess_started
      target(sockets=sockets)
      ~~~~~~^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\server.py", line 62, in run
      return asyncio.run(self.serve(sockets=sockets))
             ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\runners.py", line 195, in run
      return runner.run(main)
             ~~~~~~~~~~^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\runners.py", line 118, in run
      return self._loop.run_until_complete(task)
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\base_events.py", line 725, in run_until_complete
      return future.result()
             ~~~~~~~~~~~~~^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\server.py", line 69, in serve
      config.load()
      ~~~~~~~~~~~^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\config.py", line 458, in load
      self.loaded_app = import_from_string(self.app)
                        ~~~~~~~~~~~~~~~~~~^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\importer.py", line 24, in import_from_string
      raise exc from None
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\importer.py", line 21, in import_from_string
      module = importlib.import_module(module_str)
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\importlib\__init__.py", line 88, in import_module
      return _bootstrap._gcd_import(name[level:], package, level)
             ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "<frozen importlib._bootstrap>", line 1387, in _gcd_import
    File "<frozen importlib._bootstrap>", line 1360, in _find_and_load
    File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked
    File "<frozen importlib._bootstrap>", line 935, in _load_unlocked
    File "<frozen importlib._bootstrap_external>", line 1026, in exec_module
    File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
    File "C:\Users\UMAIR\Desktop\Todo-full-stack-app\backend\main.py", line 6, in <module>
      from backend.database import engine
  ModuleNotFoundError: No module named 'backend'
files_yaml:
  - backend/main.py
tests_yaml: []
prompt_text: |
  check @backend/main.py and solve this error
  C:\Users\UMAIR\Desktop\Todo-full-stack-app>cd backend

  C:\Users\UMAIR\Desktop\Todo-full-stack-app\backend>uvicorn main:app --reload --port 8000
  INFO:     Will watch for changes in these directories: ['C:\\Users\\UMAIR\\Desktop\\Todo-full-stack-app\\backend']
  INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
  INFO:     Started reloader process [16264] using WatchFiles
  Process SpawnProcess-1:
  Traceback (most recent call last):
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\multiprocessing\process.py", line 313, in _bootstrap
      self.run()
      ~~~~~~~~^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\multiprocessing\process.py", line 108, in run
      self._target(*self._args, **self._kwargs)
      ~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\_subprocess.py", line 78, in subprocess_started
      target(sockets=sockets)
      ~~~~~~^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\server.py", line 62, in run
      return asyncio.run(self.serve(sockets=sockets))
             ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\runners.py", line 195, in run
      return runner.run(main)
             ~~~~~~~~~~^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\runners.py", line 118, in run
      return self._loop.run_until_complete(task)
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\asyncio\base_events.py", line 725, in run_until_complete
      return future.result()
             ~~~~~~~~~~~~~^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\server.py", line 69, in serve
      config.load()
      ~~~~~~~~~~~^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\config.py", line 458, in load
      self.loaded_app = import_from_string(self.app)
                        ~~~~~~~~~~~~~~~~~~^^^^^^^^^^
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\importer.py", line 24, in import_from_string
      raise exc from None
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\site-packages\uvicorn\importer.py", line 21, in import_from_string
      module = importlib.import_module(module_str)
    File "C:\Users\UMAIR\AppData\Local\Programs\Python\Python313\Lib\importlib\__init__.py", line 88, in import_module
      return _bootstrap._gcd_import(name[level:], package, level)
             ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "<frozen importlib._bootstrap>", line 1387, in _gcd_import
    File "<frozen importlib._bootstrap>", line 1360, in _find_and_load
    File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked
    File "<frozen importlib._bootstrap>", line 935, in _load_unlocked
    File "<frozen importlib._bootstrap_external>", line 1026, in exec_module
    File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
    File "C:\Users\UMAIR\Desktop\Todo-full-stack-app\backend\main.py", line 6, in <module>
      from backend.database import engine
  ModuleNotFoundError: No module named 'backend'
---
Content from @backend/main.py:
from fastapi import FastAPI
from sqlmodel import SQLModel
from fastapi.middleware.cors import CORSMiddleware

# Change to absolute imports
from backend.database import engine
from backend.routers import tasks, auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(auth.router) # Include auth router

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/health")
def health_check():
    return {"status": "ok"}
---
