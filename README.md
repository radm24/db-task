# db-task

1\. Среда разработки

•	Ubuntu 16.04.2 LTS (Xenial Xerus)  
•	PHP 7.0  
•	MySQL v5.7

2\. Создание таблиц базы данных

```
CREATE TABLE doctors (
	id int NOT NULL AUTO_INCREMENT,
    full_name varchar(100) NOT NULL,
    spec varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE transactions (
	id int NOT NULL AUTO_INCREMENT,
    date date NOT NULL,
    doc_id int NOT NULL,
    summ int NOT NULL,
    PRIMARY KEY (id),
  	CONSTRAINT fk_DoctorTransaction
    FOREIGN KEY (doc_id) REFERENCES doctors(id)
);

```

3\. Заполнение таблиц

```
INSERT INTO doctors (full_name, spec) 
VALUES ("Иванов И.А.", "Терапевт"), ("Сергеев А.А.", "Хирург"), ("Малинина Ю.И.", "Массажист");


INSERT INTO transactions (date, doc_id, summ) 
VALUES ("2019.06.01", "2", "2000"), ("2019.06.01", "3", "2000"), ("2019.06.03", "1", "1000"), ("2019.06.03", "2", "500"), ("2019.06.04", "1", "2000"), ("2019.06.07", "3", "2000"), ("2018.01.01", "2", "1000"), ("2017.03.02", "1", "1500");

```

4\. Извлечение необходимого результата

Запрос для каждого врача с индивидуальным doctor_id:
```
SELECT doctors.full_name, doctors.spec, sum(summ) 
FROM transactions 
JOIN doctors ON doctors.id = transactions.doc_id 
WHERE doc_id = "3" AND transactions.date >= "2019-01-01" 
HAVING sum(summ) > "2500";

```

Конечный результат - http://a0292010.xsph.ru/
