import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export const promoteUserToAdmin = async (userEmail: string): Promise<boolean> => {
  try {
    // First, find the user by email in auth.users
    const { data: userData, error: userError } = await supabase
      .rpc('get_user_by_email', { email: userEmail });

    if (userError) {
      console.error('Error finding user:', userError);
      toast.error('User not found');
      return false;
    }

    if (!userData || userData.length === 0) {
      toast.error('User not found');
      return false;
    }

    const userId = userData[0].id;

    // Check if user already has admin role
    const { data: existingRole, error: roleCheckError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();

    if (existingRole) {
      toast.info('User is already an admin');
      return true;
    }

    // Add admin role
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      });

    if (insertError) {
      console.error('Error promoting user to admin:', insertError);
      toast.error('Failed to promote user to admin');
      return false;
    }

    toast.success('User promoted to admin successfully');
    return true;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    toast.error('Failed to promote user to admin');
    return false;
  }
};

export const revokeAdminAccess = async (userEmail: string): Promise<boolean> => {
  try {
    // First, find the user by email
    const { data: userData, error: userError } = await supabase
      .rpc('get_user_by_email', { email: userEmail });

    if (userError || !userData || userData.length === 0) {
      toast.error('User not found');
      return false;
    }

    const userId = userData[0].id;

    // Remove admin role
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', 'admin');

    if (deleteError) {
      console.error('Error revoking admin access:', deleteError);
      toast.error('Failed to revoke admin access');
      return false;
    }

    toast.success('Admin access revoked successfully');
    return true;
  } catch (error) {
    console.error('Error revoking admin access:', error);
    toast.error('Failed to revoke admin access');
    return false;
  }
};