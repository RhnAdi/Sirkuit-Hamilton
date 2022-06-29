#include <iostream>
using namespace std;
// mendefinisikan variable global, 999 merepresentasikan infinity
#define INF 999
int main()
{
  int simpul, garis = 0;
  char A[20];

  cout << "banyak simpul = ";
  cin >> simpul;
  cout << endl;

  for (int i = 0; i < simpul; i++)
  {
    cout << "Simpul ke " << i + 1;
    cout << " = ";
    cin >> A[i];
  }

  cout << "\nSisi-sinya = ";
  for (int i = 0; i < simpul; i++)
  {

    for (int j = i + 1; j < simpul; j++)
    {
      cout << " ";
      cout << A[i] << A[j];
    }
  }
  cin.get();
  return 0;
}