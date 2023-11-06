const int f = 1 << 14;

int 
convert_n_to_fp (int n)
{
 return n*f;
}

int convert_x_to_int_tozero (int x)
{
    return x/f;
}
int convert_x_to_int_tonearest (int x)
{
    return (x >= 0 ? ((x + f / 2) / f) : ((x - f / 2) / f));
}
int add_xy (int x, int y);
int sub_xy (int x, int y);
int add_xn (int x, int n);
int sub_xn (int x, int n);
int mul_xy (int x, int y);
int mul_xn (int x, int n);
int div_xy (int x, int y);
int div_xn (int x, int y);