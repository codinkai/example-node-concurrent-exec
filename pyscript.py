import time
import sys

process_id = 0
num_executions = 0

if len(sys.argv) == 3:
    process_id = int(sys.argv[1])
    num_executions = int(sys.argv[2])
else:
    print("2 parameters required")
    exit(1)

for i in range(num_executions):
    print("  Process:", process_id, " - hello world")
    time.sleep(1)
