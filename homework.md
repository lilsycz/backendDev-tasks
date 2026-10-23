## Lab 1:
1. Payload:
' OR 1=1--
2. The query:
SELECT * FROM products WHERE category = '' OR 1=1--' AND released = 1
3. The reason:
The ' closes the string early, OR 1=1 makes the condition always true, and -- comments out AND released = 1, so all products are returned, including unreleased ones.

## Lab 2: