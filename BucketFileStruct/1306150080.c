/*
Süleyman ERGEN
1306150080
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//Her bir kayıt struct olarak tutuldu.
struct book{
	int key;
	char bookName[50];
	char autor[50];
};
typedef struct book BOOK;

void menu();
void createFiles();
void insert(FILE *, FILE *);
void search();
void listAll();

int bucketHash(int key);
void booksRead(BOOK books[]);
void indexRead(int index_array[][2]);

int main(int argc, char const *argv[]){
	FILE *F1, *F2;
	int choice;

	createFiles();

	while(1){
		menu();
		scanf("%d",&choice);

		switch(choice){
			case 1:
				insert(F1, F2);
				break;
			case 2:
				search();
				break;
			case 3:
				listAll();
				break;
			case 4:
				printf("Goog bye!\n");
				exit(0);
				break;
			default:
				printf("wrong choice! Try again: ");
		}
	}
	
	return 0;
}

//kitap ekleme işlemini yapar
void insert(FILE *F1, FILE *F2){
	BOOK books[150];
	int index_array[150][2];
	int key, bucket, idx=-1;
	char bookName[50], autor[50];
	
	printf("Please enter key: ");
	scanf("%d",&key);
	getchar();
	
	printf("Please enter book name: ");
	fgets(bookName, 50, stdin);
	bookName[strlen(bookName)-1] = '\0';

	printf("Please enter the autor: ");
	fgets(autor, 50, stdin);
	autor[strlen(autor)-1] = '\0';
	//printf("%d %s %s\n",key, bookName, autor);

	bucket = bucketHash(key);

	//diziyiYazdir(books);

	indexRead(index_array);
	booksRead(books);

	//index dosyasının eklemeden sonra yazılması
	for(int i=0; i<150; i++){
		if(index_array[i][0] == key){
			printf("There is already a key you entered!\n");
			return;
		}else if(index_array[i][0] == -1){
			idx = i;
			break;
		}
	}
	if(idx != -1){
		index_array[idx][0] = key;
		index_array[idx][1] = bucket;
	}else{
		printf("%s\n", "There is no place!");
		return;
	}
	F2 = fopen("index.dat", "w");
	for (int i = 0; i < 150; i++){
		fprintf(F2, "%d %d\n", index_array[i][0], index_array[i][1]);
	}
	fclose(F2);

	//eklenen kitabın verisinin diziye eklenmesi
	for(int i=0; i<5; i++){
		if(books[bucket*5+i].key == -1){
			books[bucket*5+i].key = key;
			strcpy(books[bucket*5+i].bookName, bookName);
			strcpy(books[bucket*5+i].autor, autor);
			break;
		}
		if(i == 4){
			printf("Bucket is full!!\n");
		}
	}
	F1 = fopen("books.dat", "w");
	for (int i = 0; i < 150; i++){
		fprintf(F1, "%d*%s*%s*#", books[i].key, books[i].bookName, books[i].autor);
		if((i+1) % 5 == 0){
			fprintf(F1, "\n");
		}

	}
	fclose(F1);
}

//menüyü listeler
void menu(){
	printf("Please choose one:\n"
			"1. insert\n"
			"2. Search\n"
			"3. List all\n"
			"4. EXIT\n"
			"What do you want? ");
}

//kitaplar arasında arama yapar
void search(){
	BOOK books[150];
	int index_array[150][2];
	int key, bucket, a=0;

	indexRead(index_array);
	booksRead(books);
	
	printf("Please enter the key: ");
	scanf("%d", &key);

	for(int i=0; i<150; i++){
		if(key == index_array[i][0]){
			printf("Key found!\n");
			bucket = index_array[i][1];
			for(int j=0; j<5; j++){				
				if(key == books[bucket*5+j].key){
					printf("Book found:\n");
					printf("key: %d\nBook Name: %s\nAutor: %s\n", 
							books[bucket*5+j].key, books[bucket*5+j].bookName, books[bucket*5+j].autor);
					a=1;
					break;
				}
			}
			break;
		}
	}

	if (a == 0)
		printf("Key/Book can not found!!!\n");
}

//tüm kitapları listeler
void listAll(){
	BOOK books[150];
	booksRead(books);
	for (int i = 0; i < 150; i++){
		printf("Key: %d Book Name: %s Autor: %s\n", books[i].key, books[i].bookName, books[i].autor);
	}
}

//bucket hash fonksiyonu
int bucketHash(int key){

	int SHELF = 30;
	int hash = key % SHELF;

	return hash;
}

//dosyalar yoksa oluşturulur.
void createFiles(){
	FILE *Fp1, *Fp2;

	Fp1 = fopen("books.dat","r");
	if (Fp1 == NULL){
		Fp1 = fopen("books.dat","w");
		for (int column = 0; column < 30; column++){
			for (int row = 0; row < 5; row++){
				fprintf(Fp1, "%d*%s*%s*#", -1, "NULL", "NULL");
			}
		fprintf(Fp1, "\n");
		}
		fclose(Fp1);
	}
	
	Fp2 = fopen("index.dat","r");
	if( Fp2 == NULL){
		Fp2 = fopen("index.dat","w");
		for(int i=0; i<150; i++){
			fprintf(Fp2, "%d %d\n", -1, -1);
		}
	}
	fclose(Fp2);
	
}

//books dosyasını okur ve BOOK struct dizisine atar.
void booksRead(BOOK books[]){
	FILE *F1;
	for(int i=0; i<150; i++){
		books[i].key = -1;
		strcpy(books[i].bookName, "NULL");
		strcpy(books[i].autor, "NULL");
	}
	//for(int i=0; i<150; i++)   printf("%d %s %s\n", books[i].key, books[i].bookName, books[i].autor);
	
	char c, tmp[50];
	int count=0, record=0, dex=0;


	//dosyadan okumma ve BOOK dizisine aktarma
	F1 = fopen("books.dat", "r");
	while(1){
		c = getc(F1);
		if(feof(F1))
			break;
		
		//printf("---%c\n", c);
		if(c != '#'){
			if(c != '*'){
				tmp[dex] = c;
				dex++;

				//printf("%d %c \n", dex, c);
				//printf("%s\n", tmp);
			}else{
				//printf("%s\n", tmp);

				if(count%3 == 0){
					books[record].key = atoi(tmp);
					//printf("key: %d ", books[record].key);

				}else if(count%3 == 1){
					strcpy(books[record].bookName, tmp);
					//printf("bookName: %s ", books[record].bookName);
				}else if(count%3 == 2){
					strcpy(books[record].autor, tmp);
					//printf("autor: %s \n", books[record].autor);
				}
				
				count++;
				for(int i=0; i<50;i++) tmp[i]='\0';
				dex=0;
			}
			
		}else{
			//printf("%d-> %d %s %s\n", record, books[record].key, books[record].bookName, books[record].autor);
			record++;
		}
	}
	fclose(F1);

}

//index dosyasını okur ve int dizisine atar
void indexRead(int index_array[150][2]){
	FILE *F2;
	F2 = fopen("index.dat", "r");
	int index_no=0;

	while(1){
		if(feof(F2))
			break;
		char tmp1[10];
		char tmp2[10];

		fscanf(F2, "%s %s", tmp1, tmp2);

		index_array[index_no][0] = atoi(tmp1);
		index_array[index_no][1] = atoi(tmp2);

		index_no++;
	}

	fclose(F2);
}
